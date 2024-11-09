import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="p-2">
      <header>
      <SignedOut>
        <SignInButton >
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </div>
  )
}

export default App;
