// app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                One Conversation, Multiple AI Services
              </h1>
              <p className="text-xl mb-8">
                Access OpenAI, Anthropic, Google, and other AI models all from a single, unified interface.
                Compare responses, mix and match capabilities, and streamline your AI workflow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {session ? (
                  <Link href="/chat">
                    <Button size="lg" variant="default">
                      Go to Chat
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button size="lg" variant="default">
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline">
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Multiple AI Services</h3>
                <p>
                  Seamlessly switch between OpenAI, Anthropic, Google, and other AI providers without leaving your conversation.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Unified Conversation</h3>
                <p>
                  Keep your entire thread in one place, even when using different models for different questions.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Customizable Settings</h3>
                <p>
                  Fine-tune temperature, max tokens, and other parameters for each request to get exactly the response you need.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to streamline your AI workflow?
            </h2>
            {!session && (
              <Link href="/signup">
                <Button size="lg" variant="default">
                  Get Started For Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}