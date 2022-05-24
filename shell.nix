{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "discover";
  buildInputs = with pkgs; [
    nodejs-12_x
    (yarn.override { nodejs = nodejs-12_x; })
    python2
  ];
}
