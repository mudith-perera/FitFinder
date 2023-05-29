///////////////////////// Developer       : Gimhani Harshika  /////////////////////////
///////////////////////// Modified Date   : 22-05-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";

function Favorite(props) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const variable = {
    gymId: props.gymId,
    userId: props.userId
  };

  console.log(variable.gymId);
  console.log(variable.userId);

  useEffect(() => {
    fetch('/api/favorite/favorite-Number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(variable)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFavoriteNumber(data.favoriteNumber);
        } else {
          console.log('Failed to get favorite number');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('Failed to get favorite number');
      });

    fetch('/api/favorite/is-favorited', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(variable)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFavorited(data.favorited);
        } else {
          console.log('Failed to get favorite info');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('Failed to get favorite info');
      });
  });

  const onClickFavorite = () => {
    if (favorited) {
      // When already added gym to favorites
      fetch('/api/favorite/remove-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variable)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            console.log('Failed to remove from favorites');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          console.log('Failed to remove from favorites');
        });
    } else {
      // When not adding gym to favorites yet
      fetch('/api/favorite/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variable)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setFavoriteNumber(favoriteNumber + 1);
            setFavorited(!favorited);
          } else {
            console.log('Failed to add to favorites');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          console.log('Failed to add to favorites');
        });
    }
  };

  return (
    <div>
      <Button size="small" onClick={onClickFavorite}>
        {favorited ? ' Remove from Favorite ' : 'Add to Favorite'} {favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;


