'use client';

import { getDiagram } from '@/entities/area';
import { useEffect, useState } from 'react';

type DiagramProps = Readonly<{
  areaId: number;
}>;

export default function Diagram({ areaId }: DiagramProps) {
  const [diagramHtml, setDiagramHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getDiagram(areaId)
      .then(setDiagramHtml)
      .finally(() => setIsLoading(false));
  }, [areaId]);

  console.log(isLoading);
  return (
    <>
      {diagramHtml && !isLoading ? (
        <iframe className="w-full h-[1000px]" srcDoc={diagramHtml} />
      ) : null}
      {!diagramHtml && !isLoading ? 'Нет диаграммы' : null}
      {isLoading ? 'Загрузка...' : null}
    </>
  );
}
