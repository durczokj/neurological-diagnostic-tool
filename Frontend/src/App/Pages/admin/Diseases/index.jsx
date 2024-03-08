import React, { useState, useCallback, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next'
import symptomsService from '../../../services/diseases';


export default function AdminDiseases() {

    const diseasesColumns = [
      { field: "name", headerName: "name", width: 150 },
      { field: "group", headerName: "group", width: 150 },
      { field: "subgroup", headerName: "subgroup", width: 150 },
      { field: "description", headerName: "description", width: 150 }
    ];

}
