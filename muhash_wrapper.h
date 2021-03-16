#ifndef MUHASH_WRAPPER_H
#define MUHASH_WRAPPER_H

#include <napi.h>
#include "muhash.h"

class MuHashWrapper : public Napi::ObjectWrap<MuHashWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  MuHashWrapper(const Napi::CallbackInfo& info);

 private:
  void Insert(const Napi::CallbackInfo& info);
  void Remove(const Napi::CallbackInfo& info);
  void Mul(const Napi::CallbackInfo& info);
  void Div(const Napi::CallbackInfo& info);
  Napi::Value GetHashBase64(const Napi::CallbackInfo& info);
  Napi::Value GetHash(const Napi::CallbackInfo& info);

  MuHash3072 _mu_hash_instance;
};

#endif
