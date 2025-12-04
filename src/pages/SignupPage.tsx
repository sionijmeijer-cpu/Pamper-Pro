import SignupWithACS from '../components/SignupWithACS';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full">
        <SignupWithACS />
      </div>
    </div>
  );
}
