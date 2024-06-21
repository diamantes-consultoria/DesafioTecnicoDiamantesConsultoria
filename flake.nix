{
  inputs.pkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.prisma-utils.url = "github:VanCoding/nix-prisma-utils";

  outputs = {
    pkgs,
    prisma-utils,
    ...
  }: let
    nixpkgs = import pkgs {system = "x86_64-linux";};
    prisma =
      (prisma-utils.lib.prisma-factory {
        inherit nixpkgs;
        prisma-fmt-hash = "sha256-UCk1WGDbcXTXyfqAnFoVaWZl1Hd8H0m0LxripbWSDm8="; # just copy these hashes for now, and then change them when nix complains about the mismatch
        query-engine-hash = "sha256-RJ4vJ2FmiknAInkVrpMP1SCAnZJZNSdJahSECdHi1jA=";
        libquery-engine-hash = "sha256-ylE/SHHRlQu2uJRSaXxZCD/sHwF2deHOULYWG0qhZMo=";
        schema-engine-hash = "sha256-pr/ioDDU0A5LNIeWzWjNnq/A5Lfn7lFxqWJfA1CER+k=";
      })
      .fromNpmLock
      ./package-lock.json; # <--- path to our package-lock.json file that contains the version of prisma-engines
  in {
    devShells.x86_64-linux.default = nixpkgs.mkShell {shellHook = prisma.shellHook;};
  };
}
