import PropTypes from 'prop-types';
export function Dashboard({ user }) {
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {user?.user_name}</p>
        </>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object,
};