import { Box } from '@mui/material';

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <Box className="flex flex-row justify-center items-center bg-primary h-0.7/10 min-h-0.7/10 text-primary">
      <p>{title}</p>
    </Box>
  );
}
