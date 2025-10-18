# 🤝 Contributing to Routix

Thank you for your interest in contributing to Routix! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct. By participating, you agree to uphold this code.

### Our Pledge
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git
- VS Code (recommended)

### Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/routix-delivery-platform.git
   cd routix-delivery-platform
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/originalusername/routix-delivery-platform.git
   ```

### Setup Development Environment
1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Set up environment variables (see [SETUP.md](SETUP.md))
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔄 Development Process

### Branch Naming Convention
Use descriptive branch names:
- `feature/add-payment-integration`
- `bugfix/fix-mobile-responsive-issue`
- `hotfix/critical-security-patch`
- `docs/update-api-documentation`

### Creating a Branch
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Or using newer Git syntax
git switch -c feature/your-feature-name
```

### Making Changes
1. Make your changes
2. Test thoroughly
3. Follow coding standards
4. Update documentation if needed
5. Commit with descriptive messages

### Commit Message Format
Use conventional commits:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add two-factor authentication
fix(maps): resolve Google Maps loading issue
docs(api): update authentication endpoints
style(ui): improve button hover effects
```

## 📝 Coding Standards

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add PropTypes or TypeScript for type checking

### CSS
- Use CSS custom properties (variables)
- Follow BEM methodology for class naming
- Use modern CSS features (Grid, Flexbox)
- Ensure responsive design
- Follow the existing design system

### Code Style
- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Example Code Structure
```jsx
// Component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // State declarations
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

export default ComponentName;
```

## 🔍 Testing

### Frontend Testing
```bash
cd Frontend
npm test
```

### Backend Testing
```bash
cd Backend
npm test
```

### Test Coverage
- Aim for at least 80% test coverage
- Test critical user flows
- Include unit and integration tests
- Test error scenarios

### Manual Testing Checklist
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Test with different user roles (customer, driver, admin)
- [ ] Test error scenarios and edge cases
- [ ] Verify real-time features work correctly

## 📤 Pull Request Process

### Before Submitting
1. Ensure your branch is up to date:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Run tests and ensure they pass
3. Check for linting errors
4. Update documentation if needed
5. Test your changes thoroughly

### Pull Request Template
When creating a PR, use this template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process
1. Automated checks must pass
2. At least one maintainer review required
3. Address all review comments
4. Update PR based on feedback
5. Maintainer will merge when ready

## 🐛 Issue Reporting

### Bug Reports
Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

### Feature Requests
Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots.
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Mobile responsiveness improvements
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] Push notifications
- [ ] API documentation

### Medium Priority
- [ ] Unit test coverage
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Internationalization
- [ ] Dark mode theme

### Low Priority
- [ ] Additional language support
- [ ] Advanced reporting features
- [ ] Third-party integrations
- [ ] Advanced search functionality

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Postman](https://www.postman.com/) (for API testing)

## 💬 Communication

### Getting Help
- Check existing issues and discussions
- Join our [Discord community](https://discord.gg/routix)
- Email: dev@routix.com

### Discussion
- Use GitHub Discussions for questions
- Use Issues for bugs and feature requests
- Use Pull Requests for code changes

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Community highlights

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

## 🙏 Thank You

Thank you for contributing to Routix! Your efforts help make delivery management better for everyone.

---

**Happy Coding! 🚀**
