{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.openssl
    pkgs.libffi
    pkgs.zlib
    pkgs.glibc
  ];

  shellHook = ''
    export PRISMA_QUERY_ENGINE_BINARY=$(pwd)/node_modules/.prisma/client/query-engine
  '';
}
