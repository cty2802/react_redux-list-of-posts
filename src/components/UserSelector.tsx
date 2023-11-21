import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/secondApp/usersSlice';
import * as postsActions from '../features/secondApp/postsSlice';
import * as authorActions from '../features/secondApp/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state: RootState) => {
    return state.users.users;
  });

  const selectedUser = useAppSelector((state: RootState) => {
    return state.author.author;
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postsActions.loadPostsByUser());
  }, [selectedUser, dispatch]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => dispatch(authorActions.setAuthor(user))}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
