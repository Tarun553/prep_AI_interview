import Agent from "@/componets/agents";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user.name}
        userId={user.id}
        type="generate"
      />
    </>
  );
};

export default Page;
