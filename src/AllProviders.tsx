import { ContentProvider } from './context/ContentContext';
import { OptionsProvider } from './context/OptionsContext';
import { UserProvider } from './context/UserContext';

const AllProivders = ({ children }) => {
  return (
    <OptionsProvider>
      <UserProvider>
        <ContentProvider>{children}</ContentProvider>
      </UserProvider>
    </OptionsProvider>
  );
};

export default AllProivders;
