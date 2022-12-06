import React, {useState, useEffect} from "react";

const EffectEx = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

const onChangeName = e => {
    setName(e.target.value);
}

const onChangeNickname = e => {
    setNickname(e.target.value);
}

    useEffect(() => {
        console.log('effect');
        console.log(name);
        return () => {
            console.log('cleanup');
            console.log(name);
        }
    }, [name]);
  return (
    <>
        <div>
            <input value={name} onChange={onChangeName}></input>
            <input value={nickname} onChange={onChangeNickname}></input>
        </div>
    </>
  );
}

export default EffectEx;