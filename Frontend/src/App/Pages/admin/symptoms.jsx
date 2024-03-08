import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import symptomService from './services/symptomService';

// console.log(promise2)



export default function Symptoms() {

    // todo - get data from backend
//     const initialNodes = [
//      { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//      { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//     ];
//     const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

    const { t } = useTranslation("translations")

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

   useEffect(() => {
    symptomService.getSymptoms().then((data) => {
      console.log(data)
      // todo format the data to fit the nodes
      setNodes(data)
    })
   }, []) // if [] is empty, it will only run once


    const onConnect = useCallback(
        (params) => setEdges((eds) => {
            addEdge(params, eds))
            symptomService.postSymptoms(params)
        },
        [setEdges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
    );
}