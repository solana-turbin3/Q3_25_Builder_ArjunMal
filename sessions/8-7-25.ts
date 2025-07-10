// Vault
// program-derived account (PDA) that acts as a custodian of tokens






// Additional Information
// #![allow(unexpected_cfgs)]
// Allows the compiler to ignore warnings about unrecognized or unexpected #[cfg(...)] configurations

// #![allow(deprecated)]
// Allows usage of deprecated functions, types, or traits without emitting warnings

// anchor needs to calculate and needs to find the canoical bump, canoical bump is the first bump that throws the address 
// out of the elliptic curve to be able to generate a PDA
// start at 255 and can go until 0