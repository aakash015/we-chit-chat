export function getNameInitials(name){
   
   const splitName = name.toUpperCase().split(' ');

   console.log(splitName);
   if(splitName.length>1){

    return splitName[0][0]+splitName[1][0];
   }

   return splitName[0][0];
}


export function transformToArr(snapVal){

   return snapVal?Object.keys(snapVal):[];
   
}


export function transformToArrWithId(snapVal)
{
   return snapVal?Object.keys(snapVal).map(roomId =>{

      return {...snapVal[roomId],id: roomId}
   }):[]
}

export async function getUserUpdates(userId,keyToUpdate,value,database)
{
  
   const updates = {}
   updates[`/profiles/${userId}/${keyToUpdate}`] = value;
   
   const getMsgs = database.ref(`/messages`).orderByChild('author/uid').equalTo(userId).once('value');

   const getRooms = database.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');

   const [mSnap,rSnap] = await Promise.all([getMsgs,getRooms]);

   console.log("heyyyy i am mSnap");
   console.log(mSnap);


   mSnap.forEach(msgSnap => {
       
      updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
   });

   rSnap.forEach(roomSnap => {
       
      updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
   });


   return updates;
}

//groupBy(messages,(msgItem)=> msgItem.createdAt)

export function groupBy(array,groupingKeyFn){

   return array.reduce((result,item)=>{
       
         const groupingKey = groupingKeyFn(item);
        
         if(!result[groupingKey]){
            result[groupingKey] = [];
            console.log("venu swami muttu swami ram gopa iyer")
            
         }

         result[groupingKey].push(item)
         

          console.log("mera yashu yashu mera yashu yashu")
         console.log(result);

         return result
   },{})

}