function SidebarFilter() {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{ width: '250px', position: 'fixed' }}
        >
            <h5 className="fw-semibold mb-4">Filters</h5>

            <div className="mb-3">
                <label className="form-label fw-bold">Specializations</label>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="dev" />
                    <label className="form-check-label" htmlFor="dev">Web development</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="data" />
                    <label className="form-check-label" htmlFor="data">Data Science</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="mobile" />
                    <label className="form-check-label" htmlFor="mobile">Mobile development</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="cyber" />
                    <label className="form-check-label" htmlFor="cyber">Cybersecurity</label>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Stack</label>
                <select className="form-select" defaultValue="">
                    <option value="">Сhoose...</option>
                    <option value="js">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="sql">SQL</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Level</label>
                <select className="form-select" defaultValue="">
                    <option value="">Choose...</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div className="mt-auto">
                <button className="btn btn-primary">Apply filters</button>
            </div>
        </div>
    );
}


export default SidebarFilter;
