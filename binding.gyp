{
  "targets": [
    {
      "target_name": "addon",
      "cflags!": [ "-fno-exceptions"],
      "cflags_cc!": [ "-fno-exceptions", "-fno-rtti" ],
      "sources": [ "addon.cc", "muhash_wrapper.cpp", "muhash.cpp", "uint256.cpp", "chacha20.cpp", "util.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "/home/jeza/vcpkg/packages/cryptopp_x64-linux/include" 
      ],
      "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      'libraries': ["/home/jeza/vcpkg/packages/cryptopp_x64-linux/lib/libcryptopp.a"],
    }
  ]
}
