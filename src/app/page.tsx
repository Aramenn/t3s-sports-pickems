import Link from 'next/link';

export default function HomePage() {
  const today = new Date();
  const seasonStart = new Date('2025-08-23T00:00:00Z'); // Week Zero start date
  const timeDiff = seasonStart.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days

  let message = 'Check back soon!';
  if (daysLeft > 0) {
    message = `Season starts in ${daysLeft} days!`;
  } else if (daysLeft === 0) {
    message = 'Season starts today!';
  } else {
    message = 'Season has started—make your picks!';
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{message}</h1>
        <p className="text-lg mb-8">Get ready for college football action starting August 23, 2025.</p>
        <p className="text-lg mb-9">The 2025 season will feature an overhauled pick system and new trophies to compete for!</p>
        <Link href="/picks" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Picks (Picks page available soon!)
        </Link>
      </div>
    </div>
  );
}