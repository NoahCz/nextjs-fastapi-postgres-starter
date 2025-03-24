import CreateThread from "./components/create-thread/create-thread.component";
import { ThreadList } from "./components/thread-list";
import { UserInfo } from "./components/user-info/user-info";
import { UserProvider } from "./context/user/UserContext";

export default function Home() {
  return (
    <main className="py-8 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">Home</h1>

      <UserProvider>
        <UserInfo />
        <CreateThread />
        <ThreadList />
      </UserProvider>
    </main>
  );
}
