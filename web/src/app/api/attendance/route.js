import {collection,  addDoc, getDocs, getFirestore} from 'firebase/firestore';
import {app} from '@/firebase/config';

const db = getFirestore(app);

export async function POST(request) {
  const newAttedance = await request.json()
  try {
    // add new attendace to the database
    const result = await addDoc(collection(db, "attendance"), newAttedance);
    const docRef = result._key.path.segments.join('/');
    return Response.json(docRef);
  
  } catch (e) {
    return Response.error({error: e});
  }
}
