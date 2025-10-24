import { Header } from "./components/Header.jsx";
import { PageLayout } from "./components/PageLayout.jsx";
import { Chat } from "./chat/chat.jsx";

export default function RecruitmentPage() {
  return (
    <PageLayout>
      <Header />
      <Chat />
    </PageLayout>
  );
}
