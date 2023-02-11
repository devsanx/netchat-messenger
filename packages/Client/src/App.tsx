import { AppBar } from "src/components";
import { Messaging } from "src/layouts";
import { AppTheme } from "src/theme";
import * as Contexts from "src/contexts";

const App = () => {
  return (
    <AppTheme>
      <Contexts.SocketProvider>
        <Contexts.ContactsProvider>
          <Contexts.ChatRoomProvider>
            <Contexts.MessagesProvider>
              <AppBar />
              <Messaging />
            </Contexts.MessagesProvider>
          </Contexts.ChatRoomProvider>
        </Contexts.ContactsProvider>
      </Contexts.SocketProvider>
    </AppTheme>
  );
};

export default App;
