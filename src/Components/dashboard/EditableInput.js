import React, { useState } from 'react'
import { Input, InputGroup,Icon, Alert } from 'rsuite'

const EditableInput = (
  {initialValue,
  onSave,label=null,
  placeholder="write your value",
  emptyMsg="Input Is Empty",
  wrapperClassName="",
  ...InputProps}
  ) => {
  
  const [input,setInput] = useState(initialValue);
  const [isEditable,setIsEditable] = useState(false);
  const onInputChange = (value)=>{
      
    setInput(value)
  }
  
  const onEditClick = ()=>{
    
    setIsEditable(p=>!p)
    setInput(initialValue)
  }


  const onSaveClick = async ()=>{
     const trimmed = input.trim();

     if(trimmed === '')
     {
       Alert.info(emptyMsg,4000)
     }

     if(trimmed!==initialValue)
     {
        await onSave(trimmed)
     }
     setIsEditable(false);
  }
  return (
    <div className={wrapperClassName}>
      {label}
     <InputGroup> 
      <Input {...InputProps}
       placeholder={placeholder}
        value = {input}
        disabled = {!isEditable}
        onChange={onInputChange} />

        <InputGroup.Button onClick={onEditClick}>
         <Icon icon = {isEditable?'close':'edit2'}></Icon>
        </InputGroup.Button>

       {isEditable && 
           <InputGroup.Button onClick={onSaveClick}>
           <Icon icon = "check"></Icon>
          </InputGroup.Button>
       }
     </InputGroup>  
    </div>
  )
}

export default EditableInput
