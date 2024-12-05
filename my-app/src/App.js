// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import { HomePage, CustomerPage, CustomerReactQueryPage, InfiniteQueriesPage, AddPostDetailPage,
  CustomerDetailOnFetchPage, CustomerInfoPage, ParallelQueryPage, DynaminParallelQueriesPage, 
  DependentQueryPage, PaginatedQueriesPage
} from './components/index';
import { ReactQueryDevtools } from 'react-query/devtools'

// import { LazyLoading } from './LazyLoading';

const LazyloadComponent = React.lazy(() => import('./LazyLoading'));

const queryClient = new QueryClient;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/customer-page">Tradition Customer Page</Link>
              </li>
              <li>
                <Link to="/customer-rq-page">React Query Customer Page</Link>
              </li>
              <li>
                <Link to="/customer-dtl-on-click">Customer Details Page on button Click</Link>
              </li>
              <li>
                <Link to="/add-post">Add Post Details</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/customer-rq-page/:custId" element={<CustomerInfoPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/customer-page" element={<CustomerPage />}></Route>
            <Route path="/customer-rq-page" element={<CustomerReactQueryPage />}></Route>
            <Route path="/customer-dtl-on-click" element={<CustomerDetailOnFetchPage />}></Route>
            <Route path="/parallel-query" element={<ParallelQueryPage />}></Route>
            <Route path='/dynamic-parallel-query' element={<DynaminParallelQueriesPage custIds = {[1,3]} />}></Route>
            <Route path="/dependent-query" element={<DependentQueryPage postId={1}/>}></Route>
            <Route path="/paginated-query" element={<PaginatedQueriesPage />}></Route>
            <Route path="/infinite-query" element={<InfiniteQueriesPage />}></Route>
            <Route path="/add-post" element={<AddPostDetailPage />}></Route>
            <Route path="lazyload" element={
              <React.Suspense fallback="Loading....">
                <LazyloadComponent />
              </React.Suspense>
            }></Route>
            {/* <Route path="lazyload" element={<LazyLoading />}></Route> */}
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
