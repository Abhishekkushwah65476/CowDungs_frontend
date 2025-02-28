import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import '../styles/Blog.css';

function Blog() {
  const blogPosts = [
    {
      title: 'The Benefits of Cow Dung Cakes',
      date: 'February 20, 2025',
      excerpt: 'Learn how cow dung cakes are an eco-friendly alternative to traditional fuels and their impact on rural economies.',
    },
    {
      title: 'Sustainable Living Tips',
      date: 'February 15, 2025',
      excerpt: 'Explore practical ways to incorporate sustainability into your daily life with natural fuel sources.',
    },
  ];

  return (
    <>
      <Header />
      <main className="blog-page">
        <section className="blog">
          <h2>Our Blog</h2>
          <p>Stay updated with tips, news, and stories about sustainable living and rural traditions.</p>
          <div className="blog-posts">
            {blogPosts.map((post, index) => (
              <div className="blog-post" key={index}>
                <h3>{post.title}</h3>
                <p className="date">{post.date}</p>
                <p>{post.excerpt}</p>
                <a href="#" className="read-more">Read More</a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default Blog;