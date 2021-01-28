import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserImgLink } from 'src/helpers/imageHelper';
import {
  Grid,
  Image,
  Input,
  Button
} from 'semantic-ui-react';

/* eslint-disable */
const Profile = ({ user }) => {
  const [isNotEditMode, setEditMode] = useState(true);

  const toggleProfileMode = () => {
    setEditMode(!isNotEditMode);
  };

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>  
      <Grid.Column>
        <Image centered src={getUserImgLink(user.image)} size="medium" circular />
        <br />
        <Input
          icon="user"
          iconPosition="left"
          placeholder="Username"
          type="text"
          disabled={isNotEditMode}
          value={user.username}
        />
        <br />
        <br />
        <Input
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          disabled={isNotEditMode}
          value={user.email}
        />
        <br />
        <br />
        <Button type="button" color="teal" size="large" primary onClick={toggleProfileMode}>
          Edit profile
        </Button>
      </Grid.Column>
    </Grid>
  )
};

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any)
};

Profile.defaultProps = {
  user: {}
};

const mapStateToProps = rootState => ({
  user: rootState.profile.user
});

export default connect(
  mapStateToProps
)(Profile);
