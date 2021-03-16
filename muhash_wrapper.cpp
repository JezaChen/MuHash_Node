#include "muhash_wrapper.h"

#include <string>


Napi::Object MuHashWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func =
      DefineClass(env,
                  "MuHash",
                  {InstanceMethod("insert", &MuHashWrapper::Insert),
                   InstanceMethod("remove", &MuHashWrapper::Remove),
                   InstanceMethod("mul", &MuHashWrapper::Mul),
                   InstanceMethod("div", &MuHashWrapper::Div),
                   InstanceMethod("finalizeBase64", &MuHashWrapper::GetHashBase64),
                   InstanceMethod("finalizeBuffer", &MuHashWrapper::GetHash)
                   });

  Napi::FunctionReference* constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  exports.Set("MuHashWrapper", func);
  return exports;
}

MuHashWrapper::MuHashWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<MuHashWrapper>(info){
  Napi::Env env = info.Env();

  int length = info.Length();

  if (length != 1 || !info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Buffer expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Buffer<unsigned char> value = info[0].As<Napi::Buffer<unsigned char>>();
  this->_mu_hash_instance = MuHash3072(value.Data(), value.Length());
}

void MuHashWrapper::Insert(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int length = info.Length();

  if (length != 1 || !info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Buffer expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Buffer<unsigned char> value = info[0].As<Napi::Buffer<unsigned char>>();
  this->_mu_hash_instance.Insert(value.Data(), value.ByteLength());
}

void MuHashWrapper::Remove(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int length = info.Length();

  if (length != 1 || !info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Buffer expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Buffer<unsigned char> value = info[0].As<Napi::Buffer<unsigned char>>();
  this->_mu_hash_instance.Remove(value.Data(), value.ByteLength());
}

void MuHashWrapper::Mul(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int length = info.Length();

  if (length != 1 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Object expected").ThrowAsJavaScriptException();
    return;
  }
  
  MuHashWrapper* obj =
      Napi::ObjectWrap<MuHashWrapper>::Unwrap(info[0].As<Napi::Object>());
  this->_mu_hash_instance *= obj->_mu_hash_instance;
}

void MuHashWrapper::Div(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int length = info.Length();

  if (length != 1 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Object expected").ThrowAsJavaScriptException();
    return;
  }
  
  MuHashWrapper* obj =
      Napi::ObjectWrap<MuHashWrapper>::Unwrap(info[0].As<Napi::Object>());
  this->_mu_hash_instance /= obj->_mu_hash_instance;
}

Napi::Value MuHashWrapper::GetHashBase64(const Napi::CallbackInfo& info) {
    std::string hash = this->_mu_hash_instance.FinalizeBase64();
    return Napi::String::New(info.Env(), hash);
}

Napi::Value MuHashWrapper::GetHash(const Napi::CallbackInfo& info) {
    uint256 rslt; //256bit uint
    this->_mu_hash_instance.Finalize(rslt);
    unsigned char tmp[32]; 
    rslt.Serialize((char *)tmp); //todo
    return Napi::Buffer<unsigned char>::Copy(info.Env(), tmp, 32); //不能用New而是用Copy, 因为tmp指针在函数结束后就释放了
}