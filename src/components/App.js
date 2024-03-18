import React from "react";
import AccountContainer from "./AccountContainer";

function App() {
  return (
    <div>
      <header className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
      </header>
      <main>
        <AccountContainer />
      </main>
    </div>
  );
}

export default App;
