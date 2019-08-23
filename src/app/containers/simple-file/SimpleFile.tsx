import React from 'react';
import { FileResponse } from '../../models/google-drive';

type FileProps = {
  file: FileResponse;
};

const SimpleFile = <P extends object>(
  Component: React.FC<P>
): React.FC<P & FileProps> => ({ file, ...props }: FileProps) => {
  return <Component {...props as P} />;
};

export default SimpleFile;
