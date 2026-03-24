FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install \
    intl \
    zip \
    pdo \
    pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install mhsendmail (MailHog's sendmail replacement)
# Detect architecture and download appropriate binary
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
        curl -Lsf 'https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_arm64' -o /usr/local/bin/mhsendmail || \
        curl -Lsf 'https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64' -o /usr/local/bin/mhsendmail; \
    else \
        curl -Lsf 'https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64' -o /usr/local/bin/mhsendmail; \
    fi && \
    chmod +x /usr/local/bin/mhsendmail

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy PHP configuration
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
