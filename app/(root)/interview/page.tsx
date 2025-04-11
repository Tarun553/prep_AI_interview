import Agent from "@/componets/agents";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

const Page = async () => {
  try {
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
  } catch (error) {
    // If there's an error, redirect to sign-in
    redirect('/sign-in');
  }
};

export default Page;
