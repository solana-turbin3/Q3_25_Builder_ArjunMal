// Maker and taker concept

// Interface Account

// Additional Information
// #![...] is a compiler directive that disables specific warnings for the entire crate




// Messages
// Yeah, you can use both. So let's say in production, you don't, you never know if it's two SPLs or Token 2022, or one SPL and one Token 2022.
// You would specify both Token Program A (Interface Token Interface) and Token Program B (Interface Token Interface).
// You will just specify Token Interface in the mint constraint — you'll add one for each, right?
// In this case, it will work for both. Right? Yeah, that's A and B now.


// Yeah yeah, so everything goes around that one.
// You can dynamically use the legacy Token Program or Token 2022.
// Like I said, if you are doing the same thing you would with the legacy program, you can do it with both — either legacy or 2022.
// If you want to go with the extensions, then you have to specify 2022 for all of the things that you're going to use.
// All right, I think we can go a little further — we can implement some functionality for this. So, implement make.

// btw guys: when we do 
// #[instruction(seed: u64)]
// The first argument of the function must be the seed

// if he had
//  pub fn init_escrow(&mut self,receive: u64, seed: u64, bumps: &MakeBumps) -> Result<()> {
    // u64, bumps: &MakeBumps) -> Result<()> {
        // it would fail