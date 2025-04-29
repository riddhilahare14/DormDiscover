import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANfY08RTS4jVsxVhksC9sujJVQ52-7gY0",
  authDomain: "dormdiscover-login-form.firebaseapp.com",
  projectId: "dormdiscover-login-form",
  storageBucket: "dormdiscover-login-form.appspot.com",
  messagingSenderId: "788957636592",
  appId: "1:788957636592:web:a4c5f077cb9f7dcd031f35"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


document.addEventListener('DOMContentLoaded', () => {
    const signUpEle = document.querySelector(".form_signUp");
    const signInEle = document.querySelector(".form_signIn");
    const userName = localStorage.getItem('userName');
    const elementsDiv = document.querySelector('#elements');

    if(signUpEle){

        signUpEle.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameEle = document.querySelector("#nameU").value;
            const emailEle = document.querySelector("#emailU").value;
            const passwordEle = document.querySelector("#passwordU").value;
        
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, emailEle, passwordEle);
                const userEle = userCredentials.user;
        
                const userData = {
                    name: nameEle,
                    email: emailEle,
                    password: passwordEle
                };
        
                const docRef = doc(db, "users", userEle.uid);
                await setDoc(docRef, userData);
        
                localStorage.setItem('userName', nameEle);
        
                alert("Account Created Successfully");
                window.location.href = '../html/WelcomePage.html';

            } catch (error) {
        
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    alert("Email Address Already Exists !!!");
                } else {
                    console.error("Error creating user: ", error.message);
                    alert("Unable to Create User");
                }
            }
        
        });
    }

    if(signInEle){

        signInEle.addEventListener("submit", async (e) => {
            e.preventDefault();
            const emailEle = document.querySelector("#emailI").value;
            const passwordEle = document.querySelector("#passwordI").value; 
        
            try {
                const userCredentials = await signInWithEmailAndPassword(auth, emailEle, passwordEle);
                const userEle = userCredentials.user;
        
                const docRef = doc(db, "users", userEle.uid);
                const userDoc = await getDoc(docRef);
        
                if(userDoc.exists()){
                    const userName = userDoc.data().name;
                    localStorage.setItem('userName', userName);
                }
                else{
                    console.error("No such document!")
                }
        
                localStorage.setItem('loggedInUserId', userEle.uid);
        
                alert("Logged In Successfully");
                window.location.href = '../html/WelcomePage.html';
        
            } catch (error) {
        
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-credential') {
                    alert("Incorrect Email or Password !!!");
                } else {
                    alert("Account does not Exist");
                }
            }
        });
    }

    if(userName && elementsDiv){
        const heyUserDiv = document.createElement('div');
        heyUserDiv.className = 'text';
        heyUserDiv.innerHTML = `<i class="fas fa-user my-icon"></i>Hey, ${userName}<div class="logout-container"><button id="logoutButton">Logout?</button></div>`;
        elementsDiv.insertBefore(heyUserDiv, elementsDiv.firstChild);

        const logoutBtn = document.querySelector("#logoutButton");
        if(logoutBtn){
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('userName');
                localStorage.removeItem('loggedInUserId');
                elementsDiv.removeChild(heyUserDiv);
                alert("Logged Out Successfully!!!");
                window.location.href = '../html/Login.html';
            })
        }
    }
})