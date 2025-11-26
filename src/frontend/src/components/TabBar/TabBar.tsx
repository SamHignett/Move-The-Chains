import AppBar from '@mui/material/AppBar';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import { SyntheticEvent } from 'react';

export type TabBarProps = {
  value: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
  labels: string[];
};

export default function TabBar({ handleChange, labels, value }: TabBarProps) {
  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {labels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </AppBar>
  );
}
