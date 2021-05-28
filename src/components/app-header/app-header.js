import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h1>Список дел</h1>
      <h2>выполнено {done} из {toDo}</h2>
    </div>
  );
};

export default AppHeader;