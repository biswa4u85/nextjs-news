import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
const TextEffect = ({ text1, text2 }: any) => {
    return (
        <>
            <ReactTypingEffect
                text={[text1, text2]}
            />
        </>
    );
};

export default TextEffect;