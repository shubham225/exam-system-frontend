import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadcrumbsPath(props) {
  const {
    path,
    currLocation
  } = props;

  const navigateTo = useNavigate();

  // const path_dummy = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}, 
  //                     {name : 'Exams', path : '/exam', icon : <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />}, 
  //                     {name : 'Exams', path : '/exam/1000', icon : <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {path.map((location) => (
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            color="inherit"
            onClick={(e) => {e.preventDefault(); navigateTo(location.path)}}
          >
            {location.icon}
            {location.name}
          </Link>
        ))}

        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          {currLocation}
        </Typography> 
      </Breadcrumbs>
    </div>
  );
}