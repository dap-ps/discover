{ pkgs ? import <nixpkgs> {
  config.permittedInsecurePackages = [ "nodejs-12.22.12" ];
} }:

pkgs.mkShell {
  name = "discover-build";

  buildInputs = with pkgs; [
    git
    zip
    python2
    nodejs-12_x
    (yarn.override { nodejs = nodejs-12_x; })
  ];

  NODE_NO_WARNINGS = 1;
}
