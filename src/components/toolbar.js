import React from 'react';
import { defaultCipherList } from 'constants';

const CustomToolbar = () =>(
    <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select defaultValue={""} className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option />
    </select>
    <select defaultValue={"normal"} className="ql-size">
      <option value="small" />
      <option value="normal" />
      <option value="large" />
      <option value="huge" />
    </select>
    <button className="ql-insertStar">Star</button>
  </div>
);

export default CustomToolbar;