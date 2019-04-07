import fetch from 'fetch';
import RSVP from 'rsvp';
export default class SignalingHelper {

  static postOffer(offer){
    return fetch('/api/games',
      {
        method:'POST',
        body: JSON.stringify(offer),
        headers: {
          'Content-Type': 'application/json'
        },
      });
   }

   static postAnswer(answer){
     return fetch('/api/answers',
       {
         method:'POST',
         body: JSON.stringify(answer),
         headers: {
           'Content-Type': 'application/json'
         },
       });
    }

   static findOffer(){
     return fetch('/api/games/1');
   }

   static listenForAnswers(){
     let promise = new RSVP.Promise((resolve, reject) => {
       let interval = setInterval(async () => {
         console.log('looking for answer')
         const response = await fetch('/api/answers/1');
         const responseJson = response.json();
         if(responseJson.answer){
            resolve(responseJson.answer)
            clearInterval(interval);
         }

       }, 1000);
     });
     return promise;
   }
}
