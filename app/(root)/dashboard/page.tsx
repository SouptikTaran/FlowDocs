import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { Button } from '@/components/ui/button'
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="min-h-screen bg-gray-900">
      <Header className="sticky left-0 top-0 z-50 bg-gray-800/90 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex items-center gap-4">
            <Notifications />
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </Header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {clerkUser.firstName?.[0] || clerkUser.emailAddresses[0].emailAddress[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome back, {clerkUser.firstName || 'User'}!
              </h2>
              <p className="text-gray-300 mt-1">
                {roomDocuments.data.length > 0 
                  ? `You have ${roomDocuments.data.length} document${roomDocuments.data.length === 1 ? '' : 's'} in your workspace`
                  : 'Ready to create your first document?'
                }
              </p>
            </div>
          </div>
        </div>

        {roomDocuments.data.length > 0 ? (
          <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">All Documents</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Manage and organize your documents
                </p>
              </div>
              <AddDocumentBtn 
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              />
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                <div key={id} className="group bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
                  <Link href={`/documents/${id}`} className="block p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-colors duration-200">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors duration-200">
                          {metadata.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          <p className="text-sm text-gray-400">
                            Created {dateConverter(createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-6 flex justify-end">
                    <DeleteModal roomId={id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="max-w-md w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No documents yet
              </h3>
              <p className="text-gray-300 mb-8">
                Get started by creating your first document. Collaborate with your team and bring your ideas to life.
              </p>
              <div className="flex justify-center">
                <AddDocumentBtn 
                  userId={clerkUser.id}
                  email={clerkUser.emailAddresses[0].emailAddress}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home