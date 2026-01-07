import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirect
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate(); // navigation 
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    } else {
      navigate('/create-trip'); // no tripId, redirect immediately
    }
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
      setLoading(false);
    } else {
      toast.error('No Trip Found!');
      navigate('/create-trip'); // ⬅️ redirect on invalid tripId
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-65">
      {/* Information sections */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plans */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
