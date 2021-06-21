import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBG66W5beD_QE9WfIB7NQwPeQFIpMK-nBE",
    authDomain: "food-be28c.firebaseapp.com",
    projectId: "food-be28c",
    storageBucket: "food-be28c.appspot.com",
    messagingSenderId: "759317585541",
    appId: "1:759317585541:web:089402305808e70e2d93ec",
    measurementId: "G-FYDKNP6V7S"
  };

  class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // inscription
    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

    // Connexion
    loginUser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser = () => this.auth.signOut();

    // Récupérer mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);

    // affiche les menus

    queryMenus = () => this.db.collection("menu").orderBy('position','desc').limitToLast(10);

    //selectionne un menu

    queryOneMenu = (id) => this.db.collection("menu").doc(id);

    //queryTestMethodeCreate = () => this.db.collection("menu").doc();

    //ajouter un menu

    queryAddMenu = (name,position) => this.db.collection("menu").add(name,position);

    //selectionne tous les produits

    queryProducts = () => this.db.collection("produits").orderBy('name','asc').limitToLast(7);

    //selectionne un produit
    
    queryOneProduct = (id) => this.db.collection("produits").doc(id);

    //ajouter un produit

    queryAddProduct = (name,description,price) => this.db.collection("produits").add(name,description,price);

}

export default Firebase;