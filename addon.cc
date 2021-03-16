//
// Created by jeza on 2021/3/15.
//

#include <napi.h>
#include "muhash_wrapper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return MuHashWrapper::Init(env, exports);
}

NODE_API_MODULE(addon, InitAll)
