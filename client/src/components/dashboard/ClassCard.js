import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { LeaveClass } from '../../actions/classroom';
import image from "../../img/class-background.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "310px",

    margin: theme.spacing(2),
    borderRadius: '5px',

  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  pos: {
    paddingTop: theme.spacing(2),
    color: 'white'
  },
  body: {
    backgroundSize: "cover",
    backgroundColor: '#00000070',
    backgroundBlendMode: 'darken',
    padding: theme.spacing(3),
    paddingBottom: 0
  },
  content: {
    padding: 0,
    position: 'relative'
  },
  details: {
    padding: theme.spacing(2)
  },
  avatar: {
    position: 'absolute',
    top: theme.spacing(7),
    height: theme.spacing(10),
    width: theme.spacing(10),
    right: theme.spacing(2)
  },
  delete: {
    float: 'right',
    marginRight: '15px',
    marginTop: '-20px',
    cursor: 'pointer'
  },
  edit: {
    paddingLeft: '5px',
    cursor: 'pointer'
  }
}));

const ClassCard = ({ LeaveClass, Class }) => {
  const classes = useStyles();
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <>
      <Card className={classes.root}>

        <CardContent className={classes.content}>
          <div style={{
            backgroundImage: !Class.image ? `url(` + image + `)` : `url(` + 'data:image/jpeg;base64,' + btoa(
              Class.image.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
            ) + `)`
          }} className={classes.body}>
            <Typography
              className={classes.title}
              variant="h5"
              component="a"
              href={`/class/${Class.code}`}
              gutterBottom
              color="textPrimary"
            >
              {truncate(Class.name, 12)}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {Class.admin.name}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={Class.admin.avatar} />
          <div className={classes.details}>
            <Typography variant="body1" component="p">
              Subject: {truncate(Class.subject, 14)}
            </Typography>
            <Typography variant="body1" component="p">
              Subject Code: {truncate(Class.subcode, 14)}
            </Typography>
            <Typography variant="body1" component="p">
              Class Code: {truncate(Class.code, 14)}
            </Typography>
          </div>
          <DeleteIcon
            color="error"
            className={classes.delete}
            onClick={() => LeaveClass(Class.code)}
          />
        </CardContent>
      </Card>
    </>
  );
};

ClassCard.propTypes = {
  LeaveClass: PropTypes.func.isRequired,
  Class: PropTypes.object.isRequired
};

export default connect(null, { LeaveClass })(ClassCard);
