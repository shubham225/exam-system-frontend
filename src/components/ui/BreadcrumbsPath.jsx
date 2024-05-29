import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

export default function BreadcrumbsPath(props) {
  const {
    path,
    currLocation
  } = props;

  const navigateTo = useNavigate();

  return (
    <div role="presentation" >
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