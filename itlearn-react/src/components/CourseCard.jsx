function CourseCard({ title, level, description, image }) {
    return (
        <div className="card mb-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <img
                src={image}
                className="card-img-top"
                alt={`Course cover ${title}`}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span className="badge bg-secondary mb-2">{level}</span>
                <p className="card-text">{description}</p>
                <button className="btn btn-outline-primary">Read more</button>
            </div>
        </div>
    );
}

export default CourseCard;
