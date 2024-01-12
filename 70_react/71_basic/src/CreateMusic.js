import React from 'react';

function CreateMusic({ title, singer, onChange, onCreate }) {
  return (
    <div>
      <input
        name="title"
        placeholder="노래"
        onChange={onChange}
        value={title}
      />
      <input
        name="singer"
        placeholder="가수"
        onChange={onChange}
        value={singer}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateMusic;
