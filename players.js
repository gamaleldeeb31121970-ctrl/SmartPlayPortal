
import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';

export async function addPlayer(name) {
  const docRef = await addDoc(collection(db, "players"), {
    name: name,
    score: 0,
    createdAt: new Date()
  });
  return docRef.id;
}

export async function updateScore(playerId, newScore) {
  const playerRef = doc(db, "players", playerId);
  await updateDoc(playerRef, { score: newScore });
}

export async function getPlayers() {
  const q = query(collection(db, "players"), orderBy("score", "desc"));
  const querySnapshot = await getDocs(q);
  const players = [];
  querySnapshot.forEach((doc) => {
    players.push({ id: doc.id, ...doc.data() });
  });
  return players;
}
