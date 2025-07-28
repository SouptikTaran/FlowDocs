# Contributing to FlowDocs 🤝

Thank you for your interest in contributing to FlowDocs! We welcome contributions from the community and are excited to collaborate with you.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@flowdocs.com](mailto:conduct@flowdocs.com).

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Git
- A GitHub account

### First Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/FlowDocs.git
   cd FlowDocs
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/SouptikTaran/FlowDocs.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables** (see main README.md)

## 🛠️ How to Contribute

### 🐛 Reporting Bugs

If you find a bug, please create an issue using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or GIFs if applicable
- Environment details (OS, browser, Node.js version)

### 💡 Suggesting Features

For feature requests, use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Include:

- A clear and descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Possible implementation approaches
- Any relevant mockups or examples

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or grammatical errors
- Adding examples or clarifications
- Creating new guides or tutorials
- Updating outdated information

### 🔧 Code Contributions

1. **Find an issue** to work on or create a new one
2. **Comment on the issue** to let others know you're working on it
3. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following our coding guidelines
5. **Test your changes** thoroughly
6. **Commit your changes** with clear messages
7. **Push to your fork** and create a pull request

## 🔧 Development Setup

### Local Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to [http://localhost:3000](http://localhost:3000)

3. **Make changes** and see them reflected immediately

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 📤 Pull Request Process

### Before Submitting

- [ ] **Sync with upstream**: `git pull upstream main`
- [ ] **Run tests**: `npm test`
- [ ] **Run linting**: `npm run lint`
- [ ] **Build successfully**: `npm run build`
- [ ] **Update documentation** if needed
- [ ] **Add tests** for new features

### PR Guidelines

1. **Use our PR template** when creating a pull request
2. **Reference related issues** (e.g., "Fixes #123")
3. **Provide a clear description** of what your PR does
4. **Include screenshots** for UI changes
5. **Keep PRs focused** - one feature/fix per PR
6. **Write meaningful commit messages**

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(editor): add syntax highlighting for code blocks

fix(auth): resolve login redirect issue

docs(readme): update installation instructions
```

## 📋 Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Avoid
export const Button = (props: any) => {
  return <button>{props.children}</button>;
};
```

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use semantic class names for custom styles
- Keep styles consistent with the design system

### File Organization

```
components/
├── ui/              # Reusable UI components
├── features/        # Feature-specific components
└── hooks/           # Custom React hooks

lib/
├── utils.ts         # Utility functions
├── types.ts         # Type definitions
└── actions/         # Server actions
```

## 🧪 Testing

### Test Requirements

- Write tests for all new features
- Maintain or improve test coverage
- Test both happy paths and edge cases
- Include integration tests for critical flows

### Test Structure

```typescript
// Example test file
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📚 Documentation

### Documentation Standards

- Use clear, concise language
- Include code examples where applicable
- Update relevant documentation with code changes
- Follow the existing documentation structure

### API Documentation

When adding new API endpoints or functions:

```typescript
/**
 * Creates a new document
 * @param title - The document title
 * @param content - Initial document content
 * @returns Promise resolving to the created document
 * @example
 * ```typescript
 * const doc = await createDocument('My Document', 'Hello world');
 * ```
 */
export async function createDocument(
  title: string, 
  content: string
): Promise<Document> {
  // Implementation
}
```

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### 🔥 High Priority
- **Performance optimizations**
- **Accessibility improvements**
- **Mobile responsiveness**
- **Bug fixes**

### 🚀 Features
- **New editor plugins**
- **AI assistant improvements**
- **Export/import functionality**
- **Advanced collaboration features**

### 📖 Documentation
- **Tutorial content**
- **API documentation**
- **Deployment guides**
- **Video tutorials**

### 🧪 Testing
- **End-to-end tests**
- **Performance tests**
- **Accessibility tests**
- **Cross-browser testing**

## 🏆 Recognition

Contributors will be recognized in several ways:

- **README credits**: Listed in the acknowledgments section
- **Contributor badge**: GitHub contributor status
- **Special mentions**: In release notes for significant contributions
- **Community highlights**: Featured in our community channels

## 🤔 Questions?

If you have questions about contributing:

1. **Check existing issues** and discussions
2. **Join our discussions** on GitHub
3. **Ask in issues** - tag with `question` label
4. **Email us** at [contributors@flowdocs.com](mailto:contributors@flowdocs.com)

## 📅 Release Process

### Version Releases

We follow [Semantic Versioning](https://semver.org/):

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features, backwards compatible
- **Patch (0.0.X)**: Bug fixes, backwards compatible

### Release Schedule

- **Patch releases**: As needed for critical fixes
- **Minor releases**: Monthly feature releases
- **Major releases**: Quarterly or when breaking changes are needed

## 🔄 Sync with Upstream

Keep your fork updated:

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

## 📝 Final Notes

- **Be patient**: Reviews may take time, especially for large PRs
- **Be open to feedback**: Code reviews help improve code quality
- **Ask questions**: If something is unclear, don't hesitate to ask
- **Have fun**: Contributing should be enjoyable!

Thank you for contributing to FlowDocs! Your efforts help make this project better for everyone. 🎉

---

*This contributing guide is inspired by best practices from successful open-source projects. We continuously improve it based on community feedback.*
